import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

export type SessionState = {
  /** False until the first session check finishes, so the header never flashes the wrong state. */
  ready: boolean;
  email: string | null;
};

/** Current customer session, kept fresh by auth state changes. */
export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({ ready: false, email: null });
  useEffect(() => {
    let alive = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (alive) setState({ ready: true, email: data.user?.email ?? null });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setState({ ready: true, email: session?.user?.email ?? null });
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return state;
}

export async function signOutCustomer() {
  await supabase.auth.signOut();
}
