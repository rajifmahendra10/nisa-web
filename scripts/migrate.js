const mysql = require('mysql2/promise');

(async () => {
  const c = await mysql.createConnection({
    host: '151.106.118.14', port: 3306,
    user: 'u1275606_web_nisa', password: 'WebNisa123!',
    database: 'u1275606_web_nisa', connectTimeout: 15000
  });

  // Add lyrics column
  await c.query('ALTER TABLE music ADD COLUMN IF NOT EXISTS lyrics TEXT AFTER spotify_url');
  console.log('✅ lyrics column added');

  // Insert new settings
  await c.query("INSERT IGNORE INTO site_settings (key_name, value) VALUES ('site_logo','/logo.png'),('whatsapp_url','')");
  console.log('✅ site_logo + whatsapp_url settings added');

  // Add lyrics to Anugerah Terindah
  const lyrics = `Verse:
Daddy daddy daddy
Terima kasih sudah menjagaku
Mommy mommy mommy
Terima kasih sudah mengajariku
Beruntungnya diriku daddy
Mendapatkan ayah yang baik sepertimu
Beruntungnya diriku mommy
Mendapatkan ibu yang tulus sepertimu

Bridge:
Kalau kubesar nanti, aku akan berbakti
Dan selalu sayang padamu
Daddy anugerah terindah
Mommy surga duniaku
Yang Tuhan berikan padaku...

Reff:
Kan kuuntai seribu bunga
Untukmu ayah ibuku sayang
Tak akan lekang oleh waktu
Sayangku padamu
Kamulah surgaku
Terima kasih Tuhanku
Atas kau berikan ayah ibuku
Aku bahagia selalu
Didekat, ayah ibuku, sayangku.`;

  await c.query('UPDATE music SET lyrics=? WHERE title=?', [lyrics, 'Anugerah Terindah']);
  console.log('✅ Lyrics seeded for Anugerah Terindah');

  const [rows] = await c.query('SHOW COLUMNS FROM music LIKE "lyrics"');
  console.log('Verified:', rows[0]);

  await c.end();
  console.log('\nDone!');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
