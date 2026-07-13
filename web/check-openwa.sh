sleep 5
echo "=== PM2 LOGS ==="
pm2 logs openwa-api --lines 30 --nostream 2>&1
echo "=== CURL ==="
curl -s -o /dev/null -w "%{http_code}" http://localhost:2785/api/health 2>&1
echo ""
curl -s http://localhost:2785/api/health 2>&1
