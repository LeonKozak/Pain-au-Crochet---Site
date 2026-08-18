const SUPABASE_URL =
    "https://ulqryoerbfvzeflugjwq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_ReIDRyjszShnq7t9IgKnBg_Hzp5rRGc";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );