#!/bin/bash

# 快速启动开发服务器

echo "🚀 启动 Github Translator 开发服务器..."
echo ""

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "❌ 未找到 .env 文件"
    echo "请先运行: bash scripts/setup.sh"
    exit 1
fi

# 检查 node_modules
if [ ! -d node_modules ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 启动开发服务器
echo "✅ 启动开发服务器..."
npm run dev
