CREATE TABLE public.telemetry_quota (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  window_start timestamptz NOT NULL,
  requests integer NOT NULL CHECK (requests BETWEEN 1 AND 600)
);
GRANT ALL ON public.telemetry_quota TO service_role;
ALTER TABLE public.telemetry_quota ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.telemetry_quota IS 'Private fixed-size global telemetry quota; at most one row. Visitor tracking fails closed after 600 accepted requests per minute.';
CREATE FUNCTION public.claim_telemetry_slot() RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE accepted integer;
BEGIN
  INSERT INTO public.telemetry_quota (id, window_start, requests)
  VALUES (true, date_trunc('minute', clock_timestamp()), 1)
  ON CONFLICT (id) DO UPDATE
  SET window_start = EXCLUDED.window_start,
      requests = CASE WHEN telemetry_quota.window_start <> EXCLUDED.window_start THEN 1 ELSE telemetry_quota.requests + 1 END
  WHERE telemetry_quota.window_start <> EXCLUDED.window_start OR telemetry_quota.requests < 600
  RETURNING requests INTO accepted;
  RETURN accepted IS NOT NULL;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_telemetry_slot() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_telemetry_slot() TO service_role;