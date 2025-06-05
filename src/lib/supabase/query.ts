import { supabase } from "./client";

/**
 * A generic Supabase query function.
 *
 * @param table - table name in Supabase
 * @param queryCallback - function that performs a query on the table
 */
export async function runQuery<Row>(
  table: string,
  queryCallback: (
    from: ReturnType<typeof supabase['from']> // generic call will be typed correctly inside
  ) => Promise<{ data: Row[] | null; error: any }>
): Promise<Row[] | null> {
  try {
    const { data, error } = await queryCallback(supabase.from<Row>(table));
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`[Supabase Error - ${table}]`, error);
    return null;
  }
}