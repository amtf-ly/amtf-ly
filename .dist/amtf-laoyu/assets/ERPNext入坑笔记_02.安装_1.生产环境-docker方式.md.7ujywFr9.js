import{a8 as s,s as i,q as a,a9 as e}from"./chunks/framework.BHd8faAW.js";const g=JSON.parse('{"title":"安装-生产环境-docker方式","description":"","frontmatter":{},"headers":[],"relativePath":"ERPNext入坑笔记/02.安装/1.生产环境-docker方式.md","filePath":"ERPNext入坑笔记/02.安装/1.生产环境-docker方式.md","lastUpdated":1715072040000}'),t={name:"ERPNext入坑笔记/02.安装/1.生产环境-docker方式.md"},h=e(`<h1 id="安装-生产环境-docker方式" tabindex="-1">安装-生产环境-docker方式 <a class="header-anchor" href="#安装-生产环境-docker方式" aria-label="Permalink to &quot;安装-生产环境-docker方式&quot;">​</a></h1><blockquote><p>官网原文 <a href="https://github.com/frappe/frappe_docker" target="_blank" rel="noreferrer">https://github.com/frappe/frappe_docker</a></p></blockquote><blockquote><p>码云镜像 <a href="https://gitee.com/yiguxianyun/frappe_docker" target="_blank" rel="noreferrer">https://gitee.com/yiguxianyun/frappe_docker</a></p></blockquote><p>官网出的教程详细全面……讲道理，照着抄作业应该是很easy的，但是自己一动手，意外惊喜真是应接不暇……</p><p>以下是按照官网的教程，进行安装的步骤……做了少量改动</p><blockquote><p>练习文件 <a href="https://gitee.com/yiguxianyun/amtf-xx-frappe_docker.git" target="_blank" rel="noreferrer">https://gitee.com/yiguxianyun/amtf-xx-frappe_docker.git</a></p></blockquote><h2 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h2><p>使用的环境 Windows + wsl +docker，这部分安装，网络上高手们分享的教程比较多，自行搜索下</p><h2 id="安装-traefik-反向代理、负载均衡" tabindex="-1">安装 Traefik (反向代理、负载均衡) <a class="header-anchor" href="#安装-traefik-反向代理、负载均衡" aria-label="Permalink to &quot;安装 Traefik (反向代理、负载均衡)&quot;">​</a></h2><h3 id="生成env文件" tabindex="-1">生成env文件： <a class="header-anchor" href="#生成env文件" aria-label="Permalink to &quot;生成env文件：&quot;">​</a></h3><blockquote><p>敏感数据单独拎出来，方便单独保存</p></blockquote><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;TRAEFIK_DOMAIN=localhost&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/traefik.env</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EMAIL=22831090@qq.com&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/traefik.env</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;HASHED_PASSWORD=&#39;$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> passwd </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-apr1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 123</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/\\$/\\$\\$/g&#39;)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/traefik.env</span></span></code></pre></div><blockquote><p>上面的 <code>localhost</code> 是用来在本地测试，在外网部署的情况下，应该改成真实域名</p></blockquote><blockquote><p>官网原文中替换$符号的代码 <code>sed &#39;s/\\$/\\\\\\$/g&#39;</code>，在windows wsl环境下会出错，Linux下未测试。上面进行了修改</p></blockquote><h3 id="创建容器" tabindex="-1">创建容器 <a class="header-anchor" href="#创建容器" aria-label="Permalink to &quot;创建容器&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --project-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> traefik</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --env-file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/traefik.env</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> overrides/compose.traefik.yaml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span></span></code></pre></div><h3 id="traefik控制面板路径" tabindex="-1">Traefik控制面板路径 <a class="header-anchor" href="#traefik控制面板路径" aria-label="Permalink to &quot;Traefik控制面板路径&quot;">​</a></h3><p><a href="http://localhost/dashboard/" target="_blank" rel="noreferrer">http://localhost/dashboard/</a> 用户名:admin 密码上在上面设置的</p><h2 id="安装-mariadb-数据库" tabindex="-1">安装 MariaDB 数据库 <a class="header-anchor" href="#安装-mariadb-数据库" aria-label="Permalink to &quot;安装 MariaDB 数据库&quot;">​</a></h2><h3 id="生成env文件-1" tabindex="-1">生成env文件 <a class="header-anchor" href="#生成env文件-1" aria-label="Permalink to &quot;生成env文件&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;DB_PASSWORD=db123&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/mariadb.env</span></span></code></pre></div><h3 id="创建容器-1" tabindex="-1">创建容器 <a class="header-anchor" href="#创建容器-1" aria-label="Permalink to &quot;创建容器&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --project-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mariadb</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --env-file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/mariadb.env</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> overrides/compose.mariadb-shared.yaml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span></span></code></pre></div><h2 id="安装erpnext" tabindex="-1">安装ERPNext <a class="header-anchor" href="#安装erpnext" aria-label="Permalink to &quot;安装ERPNext&quot;">​</a></h2><h3 id="生成env文件-2" tabindex="-1">生成env文件： <a class="header-anchor" href="#生成env文件-2" aria-label="Permalink to &quot;生成env文件：&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> example.env</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.env</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/DB_PASSWORD=123/DB_PASSWORD=db123/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.env</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/DB_HOST=/DB_HOST=mariadb-database/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.env</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/DB_PORT=/DB_PORT=3306/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.env</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/SITES=\`erp.example.com\`/SITES=\\\`cs1.amtf.com\\\`,\\\`cs2.amtf.com\\\`/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.env</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;ROUTER=amtf-cs1&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.env</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;BENCH_NETWORK=amtf-cs1&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.env</span></span></code></pre></div><h3 id="生成docker-compose-文件" tabindex="-1">生成docker compose 文件： <a class="header-anchor" href="#生成docker-compose-文件" aria-label="Permalink to &quot;生成docker compose 文件：&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --project-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> amtf-cs1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --env-file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.env</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose.yaml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> overrides/compose.redis.yaml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> overrides/compose.multi-bench.yaml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.yaml</span></span></code></pre></div><blockquote><p>有改动的时候，可以重新进行上面的操作，比如 版本升级、添加其他站点 的时候。</p></blockquote><h3 id="创建容器-2" tabindex="-1">创建容器: <a class="header-anchor" href="#创建容器-2" aria-label="Permalink to &quot;创建容器:&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --project-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> amtf-cs1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs1.yaml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span></span></code></pre></div><blockquote><p>如果是windows下的wsl系统，常规的volumes挂载方式不成功(找不到宿主机的相应路径)，需要修改</p></blockquote><h3 id="新建站点site安装app" tabindex="-1">新建站点site安装app <a class="header-anchor" href="#新建站点site安装app" aria-label="Permalink to &quot;新建站点site安装app&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --project-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> amtf-cs1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> backend</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  bench</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new-site</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --no-mariadb-socket</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mariadb-root-password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> db123</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --install-app</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> erpnext</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --admin-password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> admin123</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cs1.amtf.com</span></span></code></pre></div><h4 id="访问" tabindex="-1">访问 <a class="header-anchor" href="#访问" aria-label="Permalink to &quot;访问&quot;">​</a></h4><p><a href="http://cs1.amtf.com/" target="_blank" rel="noreferrer">http://cs1.amtf.com/</a> 默认admin用户名：administrator 密码是在上面设置的</p><p>访问不了？</p><p>windows环境下需要修改 <code>C:\\Windows\\System32\\drivers\\etc\\hosts</code> 文件，添加域名解析</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">127.0.0.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cs1.amtf.com</span></span></code></pre></div><blockquote><p>局域网其他电脑想访问？应该是可以在路由器上添加域名解析实现的，未验证……</p></blockquote><h2 id="安装erpnext及其他app-自行构建镜像的方式" tabindex="-1">安装ERPNext及其他app-自行构建镜像的方式 <a class="header-anchor" href="#安装erpnext及其他app-自行构建镜像的方式" aria-label="Permalink to &quot;安装ERPNext及其他app-自行构建镜像的方式&quot;">​</a></h2><p>上面安装的方式，官方已经制作好了docker镜像，直接拿来用就行了……</p><h3 id="构建镜像" tabindex="-1">构建镜像 <a class="header-anchor" href="#构建镜像" aria-label="Permalink to &quot;构建镜像&quot;">​</a></h3><p>为了安装自己需要的其他非官方app，就需要自行构建镜像了。过程中，要用到不少国外的资源，如果能顺利访问得到的话，还是会比较顺利的(除非是像我一样又踩到其他坑，好几天都爬不出来~~)……</p><p>国外资源不方便访问？临时解决办法：</p><ol><li><p>把基础环境部分(依赖国外网络的部分)，分割出来，单独制作成一个镜像，上传到docker官方仓库，方便下载复用</p><blockquote><p>国内有富有且慷慨的人，提供了 docker官方仓库 的 镜像仓库，所以你下载的时候不需要访问国外网络</p></blockquote><p>我已经上传了一个，镜像id：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">amtflaoyu/amtf-frappe15-base:v1.0</span></span></code></pre></div></li><li><p>把安装app这部分，作为另一个独立镜像，可以自行修改，叠加在上面的基础镜像上，组成最终的镜像</p></li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> APPS_JSON_BASE64</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">base64</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -w</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> resources/apps.json)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --build-arg=APPS_JSON_BASE64=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$APPS_JSON_BASE64</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -t=amtf-frappe15:v1.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --file=images/custom/frappe15</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre></div><h3 id="生成env文件-3" tabindex="-1">生成env文件 <a class="header-anchor" href="#生成env文件-3" aria-label="Permalink to &quot;生成env文件&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> example.env</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.env</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/DB_PASSWORD=123/DB_PASSWORD=db123/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.env</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/DB_HOST=/DB_HOST=mariadb-database/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.env</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/DB_PORT=/DB_PORT=3306/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.env</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/SITES=\`erp.example.com\`/SITES=\\\`cs-yy.amtf.com\\\`/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.env</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;ROUTER=amtf-cs-yy&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.env</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;BENCH_NETWORK=amtf-cs-yy&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.env</span></span></code></pre></div><h3 id="生成docker-compose-文件-1" tabindex="-1">生成docker compose 文件： <a class="header-anchor" href="#生成docker-compose-文件-1" aria-label="Permalink to &quot;生成docker compose 文件：&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --project-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> amtf-cs-yy</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --env-file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.env</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose-自定义.yaml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> overrides/compose.redis.yaml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> overrides/compose.multi-bench.yaml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.yaml</span></span></code></pre></div><h3 id="创建容器-3" tabindex="-1">创建容器: <a class="header-anchor" href="#创建容器-3" aria-label="Permalink to &quot;创建容器:&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --project-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> amtf-cs-yy</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitops/amtf-cs-yy.yaml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span></span></code></pre></div><h3 id="新建站点site安装app-1" tabindex="-1">新建站点site安装app <a class="header-anchor" href="#新建站点site安装app-1" aria-label="Permalink to &quot;新建站点site安装app&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --project-name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> amtf-cs-yy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> backend</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  bench</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new-site</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --no-mariadb-socket</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --mariadb-root-password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> db123</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --install-app</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> erpnext</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --install-app</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> erpnext_chinese</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --install-app</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> erpnext_oob</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --admin-password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> admin123</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cs-yy.amtf.com</span></span></code></pre></div><blockquote><p>上面 erpnext_chinese erpnext_oob 是 <a href="https://gitee.com/yuzelin" target="_blank" rel="noreferrer">则霖信息技术（深圳）有限公司</a> 开发的app，改善了官方版本的中文翻译、修复了一些官方版本的bug</p></blockquote><h3 id="访问-1" tabindex="-1">访问 <a class="header-anchor" href="#访问-1" aria-label="Permalink to &quot;访问&quot;">​</a></h3><p><a href="http://cs-yy.amtf.com/" target="_blank" rel="noreferrer">http://cs-yy.amtf.com/</a> 默认admin用户名：administrator 密码是在上面设置的</p><p>访问不了？</p><p>老套路，修改 <code>C:\\Windows\\System32\\drivers\\etc\\hosts</code> 文件，添加域名解析</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">127.0.0.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cs-yy.amtf.com</span></span></code></pre></div><h2 id="收工" tabindex="-1">收工~~ <a class="header-anchor" href="#收工" aria-label="Permalink to &quot;收工~~&quot;">​</a></h2>`,62),l=[h];function n(p,k,r,d,F,o){return a(),i("div",null,l)}const y=s(t,[["render",n]]);export{g as __pageData,y as default};
