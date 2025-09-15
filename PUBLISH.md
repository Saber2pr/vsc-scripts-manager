# 发布到 Open VSX Registry

这个项目配置了自动发布到 [Open VSX Registry](https://open-vsx.org/) 的 GitHub Actions。

## 设置步骤

### 1. 获取 Open VSX Token

1. 访问 [Open VSX Registry](https://open-vsx.org/)
2. 点击右上角的 "Sign In" 登录（使用 GitHub 账号）
3. 登录后，点击你的用户名，选择 "Access Tokens"
4. 点击 "Create Token" 创建新的访问令牌
5. 复制生成的 token（只显示一次，请妥善保存）

### 2. 配置 GitHub Secrets

1. 进入你的 GitHub 仓库
2. 点击 "Settings" → "Secrets and variables" → "Actions"
3. 点击 "New repository secret"
4. 名称：`OPEN_VSX_TOKEN`
5. 值：粘贴你从 Open VSX 获取的 token
6. 点击 "Add secret"

### 3. 发布流程

#### 自动发布（推荐）
1. 更新版本号：
   ```bash
   yarn release
   ```
   这会自动更新 `package.json` 中的版本号并创建 git tag

2. 推送标签：
   ```bash
   git push --tags
   ```

3. GitHub Actions 会自动运行并发布到 Open VSX Registry

#### 手动发布
1. 在 GitHub 仓库页面，点击 "Actions" 标签
2. 选择 "Publish to Open VSX Registry" 工作流
3. 点击 "Run workflow" 按钮
4. 选择分支并运行

## 验证发布

发布成功后，你可以在以下位置找到你的扩展：
- [Open VSX Registry](https://open-vsx.org/) - 搜索你的扩展名称
- Cursor IDE 中搜索扩展名称进行安装

## 注意事项

- 确保每次发布前都更新版本号
- 检查 `package.json` 中的元数据是否正确
- 确保扩展在本地测试正常
- 发布后需要等待几分钟才能在市场中搜索到

## 故障排除

如果发布失败，请检查：
1. `OPEN_VSX_TOKEN` 是否正确设置
2. 版本号是否已更新
3. 扩展是否能正常打包（`yarn package`）
4. GitHub Actions 日志中的错误信息
