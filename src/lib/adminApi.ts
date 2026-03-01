import { supabase } from '@/integrations/supabase/client'

export async function adminCall(passcode: string, action: string, params: Record<string, unknown> = {}) {
  const { data, error } = await supabase.functions.invoke('admin', {
    body: { passcode, action, ...params },
  })
  if (error) throw error
  return data
}
