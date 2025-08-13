-- Create quiz responses table for anonymous tracking
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  responses JSONB NOT NULL,
  recommendations JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_responses_session_id ON quiz_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
