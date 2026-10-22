CREATE TABLE public.customer_carts (
  user_id uuid PRIMARY KEY,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  cart_id text,
  checkout_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_carts TO authenticated;
GRANT ALL ON public.customer_carts TO service_role;

ALTER TABLE public.customer_carts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read their own cart"
  ON public.customer_carts FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert their own cart"
  ON public.customer_carts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update their own cart"
  ON public.customer_carts FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete their own cart"
  ON public.customer_carts FOR DELETE TO authenticated
  USING (auth.uid() = user_id);