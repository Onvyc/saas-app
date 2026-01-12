'use server';

import { auth } from '@clerk/nextjs/server';
import createSupabaseClient from '@/lib/supabase';

export default async function createCompanion(formData: CreateCompanion) {
  const { userId: author } = await auth();
  if (!author) throw new Error('Not authenticated');

  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select()
    .single();

  if (error || !data)
    throw new Error(error?.message || 'Failed to create a companion');

  return data;
}

export async function getAllCompanions({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) {
  const supabase = await createSupabaseClient();

  let query = supabase.from('companions').select();

  if (subject && topic) {
    query = query
      .ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
}

export async function getCompanion(id: string) {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('id', id)
    .single();

  if (error) return console.log(error);

  return data;
}

export async function addToSessionHistory(companionId: string) {
  const { userId } = await auth();
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from('session_history')
    .insert({ companionId, userId });

  if (error) throw new Error(error.message);

  return data;
}

export async function getRecentSessions(limit = 10) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .order('created_at')
    .limit(limit);

  if (error) throw new Error(error.message);
}

export async function getUserSessions(userId: string, limit = 10) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
}

export async function getUserCompanions(userId: string) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('author', userId);

  if (error) throw new Error(error.message);

  return data;
}
