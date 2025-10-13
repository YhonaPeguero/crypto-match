#!/usr/bin/env node

/**
 * Test script para verificar que la mini app funciona correctamente
 */

const https = require('https');
const http = require('http');

const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

console.log('🧪 Testing CryptoMatch Mini App...\n');

// Test 1: Verificar que la app responde
async function testAppResponse() {
  return new Promise((resolve) => {
    const url = new URL(ROOT_URL);
    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ App responde correctamente');
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
    
    req.setTimeout(5000, () => {
      console.log('❌ Timeout conectando a la app');
      req.destroy();
      resolve(false);
    });
  });
}

// Test 2: Verificar manifest de Farcaster
async function testFarcasterManifest() {
  return new Promise((resolve) => {
    const manifestUrl = `${ROOT_URL}/.well-known/farcaster.json`;
    const url = new URL(manifestUrl);
    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const manifest = JSON.parse(data);
            if (manifest.miniapp && manifest.miniapp.name === 'CryptoMatch') {
              console.log('✅ Manifest de Farcaster válido');
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
    
    req.setTimeout(5000, () => {
      console.log('❌ Timeout obteniendo manifest');
      req.destroy();
      resolve(false);
    });
  });
}

// Test 3: Verificar webhook
async function testWebhook() {
  return new Promise((resolve) => {
    const webhookUrl = `${ROOT_URL}/api/webhook`;
    const url = new URL(webhookUrl);
    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            if (response.message && response.message.includes('Webhook endpoint activo')) {
              console.log('✅ Webhook funcionando correctamente');
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
    
    req.setTimeout(5000, () => {
      console.log('❌ Timeout probando webhook');
      req.destroy();
      resolve(false);
    });
  });
}

// Ejecutar todos los tests
async function runTests() {
  console.log(`🔗 Probando en: ${ROOT_URL}\n`);
  
  const results = await Promise.all([
    testAppResponse(),
    testFarcasterManifest(),
    testWebhook()
  ]);
  
  const passed = results.filter(Boolean).length;
  const total = results.length;
  
  console.log(`\n📊 Resultados: ${passed}/${total} tests pasaron`);
  
  if (passed === total) {
    console.log('🎉 ¡Todos los tests pasaron! La mini app debería funcionar correctamente en Farcaster.');
  } else {
    console.log('⚠️  Algunos tests fallaron. Revisa los errores arriba.');
  }
  
  process.exit(passed === total ? 0 : 1);
}

runTests().catch(console.error);
