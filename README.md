# aoirint-blog-gatsby2

## Dependencies

- Node 20 (>= 20.7.0)
- npm 10

```shell
npm ci
```

## Usage
### Add articles from another repository

Create `contents` directory on the repository root.
Then add markdown files to it.

```shell
git clone https://github.com/aoirint/blog.aoirint.com-contents.git contents
```

### Preview

```shell
npm run develop
```

### Deploy

```shell
npm run clean && npm run build && npm run deploy
```
