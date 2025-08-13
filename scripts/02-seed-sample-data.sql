-- Insert some sample analytics data for testing
INSERT INTO analytics_events (session_id, event_type, event_data) VALUES
  ('sample_session_1', 'quiz_started', '{"timestamp": "2024-01-15T10:00:00Z"}'),
  ('sample_session_1', 'question_answered', '{"question_id": "experience", "answer": "Some knowledge", "question_number": 1}'),
  ('sample_session_1', 'quiz_completed', '{"total_questions": 8, "recommendations": ["spotHolding", "defi", "airdrops"]}'),
  ('sample_session_2', 'quiz_started', '{"timestamp": "2024-01-15T11:00:00Z"}'),
  ('sample_session_2', 'question_answered', '{"question_id": "experience", "answer": "Experienced", "question_number": 1}'),
  ('sample_session_2', 'quiz_completed', '{"total_questions": 8, "recommendations": ["futuresTrading", "defi", "nfts"]}');

-- Insert sample quiz responses
INSERT INTO quiz_responses (session_id, responses, recommendations) VALUES
  ('sample_session_1', 
   '[{"questionId": "experience", "value": "Some knowledge", "timestamp": "2024-01-15T10:01:00Z"}]',
   '[{"areaId": "spotHolding", "score": 85, "isPrimary": true}, {"areaId": "defi", "score": 72, "isPrimary": false}]'
  ),
  ('sample_session_2',
   '[{"questionId": "experience", "value": "Experienced", "timestamp": "2024-01-15T11:01:00Z"}]', 
   '[{"areaId": "futuresTrading", "score": 92, "isPrimary": true}, {"areaId": "defi", "score": 78, "isPrimary": false}]'
  );
