# 🚀 Github Translator - 立即开始

## 最快启动方式 (3 步)

### 1️⃣ 安装依赖

\`\`\`bash
npm install
\`\`\`

### 2️⃣ 配置环境变量

创建 \`.env\` 文件:

\`\`\`bash
# 复制示例文件
cp .env.example .env
\`\`\`

**最小配置** (必需):

\`\`\`env
# 数据库
DATABASE_URL="mysql://root:password@localhost:3306/github_translator"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret"

# 加密密钥
ENCRYPTION_KEY="your-32-byte-hex-key"

# GitHub App (创建后填入)
GITHUB_APP_ID="your-app-id"
GITHUB_APP_CLIENT_ID="your-client-id"
GITHUB_APP_CLIENT_SECRET="your-client-secret"
GITHUB_APP_PRIVATE_KEY="your-private-key"
\`\`\`

**生成密钥**:

\`\`\`bash
# NEXTAUTH_SECRET
openssl rand -base64 32

# ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

**创建 GitHub App**: 访问 https://github.com/settings/apps/new

### 3️⃣ 初始化并启动

\`\`\`bash
# 生成 Prisma Client
npm run db:generate

# 初始化数据库
npm run db:push

# 启动开发服务器
npm run dev
\`\`\`

访问: **http://localhost:3000**

---

## 🎯 功能特性

✅ **已实现的功能**:

- ✨ 首页和产品介绍
- 🔐 GitHub OAuth 登录 (NextAuth.js)
- 📊 仪表盘 - 仓库列表管理
- 🗂️ 仓库详情 - 查看翻译任务
- ⚙️ 翻译配置 - 语言和文件范围选择
- 🔧 设置页面 - API Key 管理
- 🗄️ 数据库设计 (Prisma + MySQL)
- 🎨 中国红主题 UI (Tailwind CSS)
- 📱 响应式设计

🚧 **待实现的功能** (需要后端集成):

- GitHub API 集成
- OpenRouter AI 翻译
- 翻译任务队列
- 实时进度展示 (SSE)
- PR 自动创建

---

## 📁 项目结构

\`\`\`
github-global/
├── src/
│   ├── app/                      # Next.js 页面
│   │   ├── page.tsx             # 首页
│   │   ├── dashboard/           # 仪表盘
│   │   ├── repo/[id]/           # 仓库详情
│   │   │   ├── page.tsx         # 仓库主页
│   │   │   └── config/          # 翻译配置
│   │   ├── settings/            # 设置页面
│   │   └── api/                 # API 路由
│   ├── components/ui/           # UI 组件
│   ├── lib/                     # 工具库
│   └── types/                   # 类型定义
├── prisma/
│   └── schema.prisma            # 数据库模型
├── docs/                        # 文档
├── docker/                      # Docker 配置
└── scripts/                     # 脚本
\`\`\`

---

## 🎨 设计特色

### 中国红主题

- 主色调: \`hsl(0, 84%, 50%)\` (中国红)
- 深色模式支持
- 现代化 UI 设计
- 响应式布局

### UI 组件

- Button (按钮)
- Card (卡片)
- Input (输入框)
- Progress (进度条)
- 更多组件...

---

## 🔧 开发命令

\`\`\`bash
# 开发
npm run dev              # 启动开发服务器

# 构建
npm run build            # 构建生产版本
npm start                # 启动生产服务器

# 数据库
npm run db:generate      # 生成 Prisma Client
npm run db:push          # 推送 Schema
npm run db:migrate       # 运行迁移
npm run db:studio        # 打开数据库管理界面

# 代码质量
npm run lint             # 代码检查
\`\`\`

---

## 🐳 Docker 部署

\`\`\`bash
# 进入 docker 目录
cd docker

# 启动服务
docker-compose up -d

# 初始化数据库
docker-compose exec app npx prisma db push

# 查看日志
docker-compose logs -f app

# 停止服务
docker-compose down
\`\`\`

---

## 📖 文档

- 📝 [快速启动说明](./docs/快速启动说明.md) - 详细的启动指南
- 📋 [需求规格文档](./docs/需求规格文档.md) - 产品需求和功能
- 🏗️ [技术实现方案](./docs/技术实现方案文档.md) - 技术架构和设计
- 🌐 [后端API文档](./docs/后端API接口文档.md) - API 接口规范

---

## 🌍 支持的语言

英语、简体中文、繁体中文、日语、韩语、西班牙语、法语、德语、葡萄牙语、俄语等 20+ 种语言

---

## 🤖 支持的 AI 模型

- Claude 3.5 Sonnet (推荐)
- GPT-4o (推荐)
- Gemini Pro 1.5

---

## ⚠️ 注意事项

### Windows 用户

- 使用 **Git Bash** 运行脚本
- 确保 MySQL 服务已启动

### 数据库

- 需要 MySQL 8.0+
- 确保数据库已创建: \`github_translator\`

### GitHub App

- 必须配置才能登录
- Callback URL: \`http://localhost:3000/api/auth/callback/github\`
- 需要的权限:
  - Repository > Contents: Read & Write
  - Repository > Metadata: Read
  - Repository > Pull requests: Read & Write
  - Account > Email addresses: Read

---

## 🐛 常见问题

### Q: 依赖安装失败?

\`\`\`bash
# 清理缓存
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Q: 数据库连接失败?

检查:
1. MySQL 是否运行
2. \`DATABASE_URL\` 配置是否正确
3. 数据库是否已创建

### Q: 页面样式错误?

\`\`\`bash
# 重新构建
rm -rf .next
npm run dev
\`\`\`

---

## 📧 获取帮助

- 查看文档: \`docs/\` 目录
- 检查日志: 开发服务器控制台
- GitHub Issues: 提交问题

---

## 🎉 开始使用

\`\`\`bash
# 一键启动 (使用脚本)
bash scripts/setup.sh

# 或手动启动
npm install
npm run db:generate
npm run db:push
npm run dev
\`\`\`

**祝你使用愉快! 🚀**
