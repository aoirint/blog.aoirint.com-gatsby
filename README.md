# blog.aoirint.com-gatsby

## Dependencies

- Node 14
- npm 6

```shell
npm ci
```

## Usage
### Add articles from another repository

Create `contents` directory on the repository root.
Then add markdown files to it.

```shell
git clone https://github.com/aoirint-web/blog.aoirint.com-contents.git contents
```

### Preview

```shell
npm run develop
```

### Deploy

```shell
npm run clean && npm run build && npm run deploy
```
