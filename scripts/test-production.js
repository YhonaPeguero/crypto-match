#!/usr/bin/env node

/**
 * Test script para verificar que la mini app funciona correctamente en producción
 */

const https = require('https');

const PRODUCTION_URL = 'https://cryptomatch.vercel.app';

console.log('🧪 Testing CryptoMatch Mini App in Production...\n');

// Test 1: Verificar que la app responde
async function testAppResponse() {
  return new Promise((resolve) => {
    const url = new URL(PRODUCTION_URL);
    
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ App responde correctamente en producción');
          resolve(true);
        } else {
          console.log(`❌ App responde con código ${res.statusCode}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Error conectando a la app: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('❌ Timeout conectando a la app');
      req.destroy();
      resolve(false);
    });
  });
}

// Test 2: Verificar manifest de Farcaster
async function testFarcasterManifest() {
  return new Promise((resolve) => {
    const manifestUrl = `${PRODUCTION_URL}/.well-known/farcaster.json`;
    const url = new URL(manifestUrl);
    
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const manifest = JSON.parse(data);
            if (manifest.miniapp && manifest.miniapp.name === 'CryptoMatch') {
              console.log('✅ Manifest de Farcaster válido');
              
              // Verificar campos específicos
              if (manifest.miniapp.noindex === false) {
                console.log('✅ Campo noindex configurado correctamente');
              } else {
                console.log('⚠️  Campo noindex no encontrado o incorrecto');
              }
              
              if (manifest.miniapp.homeUrl === PRODUCTION_URL) {
                console.log('✅ homeUrl apunta a la URL correcta');
              } else {
                console.log(`⚠️  homeUrl apunta a: ${manifest.miniapp.homeUrl}`);
              }
              
              resolve(true);
            } else {
              console.log('❌ Manifest de Farcaster inválido');
              resolve(false);
            }
          } catch (err) {
            console.log('❌ Error parseando manifest:', err.message);
            resolve(false);
          }
        } else {
          console.log(`❌ Manifest responde con código ${res.statusCode}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Error obteniendo manifest: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('❌ Timeout obteniendo manifest');
      req.destroy();
      resolve(false);
    });
  });
}

// Test 3: Verificar webhook
async function testWebhook() {
  return new Promise((resolve) => {
    const webhookUrl = `${PRODUCTION_URL}/api/webhook`;
    const url = new URL(webhookUrl);
    
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            if (response.message && response.message.includes('Webhook endpoint activo')) {
              console.log('✅ Webhook funcionando correctamente en producción');
              resolve(true);
            } else {
              console.log('❌ Respuesta de webhook inesperada');
              resolve(false);
            }
          } catch (err) {
            console.log('❌ Error parseando respuesta de webhook:', err.message);
            resolve(false);
          }
        } else {
          console.log(`❌ Webhook responde con código ${res.statusCode}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Error probando webhook: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('❌ Timeout probando webhook');
      req.destroy();
      resolve(false);
    });
  });
}

// Ejecutar todos los tests
async function runTests() {
  console.log(`🔗 Probando en: ${PRODUCTION_URL}\n`);
  
  const results = await Promise.all([
    testAppResponse(),
    testFarcasterManifest(),
    testWebhook()
  ]);
  
  const passed = results.filter(Boolean).length;
  const total = results.length;
  
  console.log(`\n📊 Resultados: ${passed}/${total} tests pasaron`);
  
  if (passed === total) {
    console.log('🎉 ¡Todos los tests pasaron! La mini app está lista para Farcaster.');
  } else {
    console.log('⚠️  Algunos tests fallaron. Revisa los errores arriba.');
    console.log('\n💡 Si el campo noindex no aparece, necesitas hacer un nuevo deploy.');
  }
  
  process.exit(passed === total ? 0 : 1);
}

runTests().catch(console.error);
