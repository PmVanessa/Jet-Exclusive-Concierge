#!/bin/sh
export PATH="/Users/macbook/jec-node/bin:$PATH"
cd /Users/macbook/Downloads/Claude/jec-website
exec npm run dev -- --port 5173 --host
