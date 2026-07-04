
DROP POLICY IF EXISTS "anyone can insert scan" ON public.scans;
DROP POLICY IF EXISTS "authed can insert scan" ON public.scans;
CREATE POLICY "anyone can insert scan" ON public.scans FOR INSERT TO anon
  WITH CHECK (menu_item_id IN (SELECT id FROM public.menu_items));
CREATE POLICY "authed can insert scan" ON public.scans FOR INSERT TO authenticated
  WITH CHECK (menu_item_id IN (SELECT id FROM public.menu_items));

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
