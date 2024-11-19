
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gpxftrbusdqyelbgqvom.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdweGZ0cmJ1c2RxeWVsYmdxdm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3ODA2MzIsImV4cCI6MjA0NjM1NjYzMn0.SLHd3Kc7gwC2FjWGArklpHqoJx1ZgA1UBK_VTXvVT10";
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;