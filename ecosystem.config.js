module.exports = {
  apps: [
    {
      name: 'gemarse-server',
      script: 'server/dist/index.js',
      cwd: './server',
      interpreter: 'none',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        JWT_SECRET:
          '_#r,At(cA.f%j/Zi>xFRE+pTFYGp.-qGd:WF#JUG}v$WisXjag7a[Hq_r=kgmF0,^MohfRA&d!tVK2s59,mKnV',
        DATABASE_URL: (DATABASE_URL =
          'postgresql://postgres:Putaina123!@ge-rds.cv28iokiytwq.us-west-2.rds.amazonaws.com:5432/gemarse_estate_db?schema=public'),
        PORT: 80,
      },
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
}
