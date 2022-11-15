# blog.aoirint.com-gatsby

## Dependencies

- Node 18
- npm 8

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
