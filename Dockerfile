# syntax docker/dockerfile:1.3-labs
FROM node:14

RUN <<EOF
  apt-get update

  apt-get install -y \
    gosu

  apt-get clean
  rm -rf /var/lib/apt/lists/*
EOF

RUN <<EOF
  groupadd -o -g 1000 user
  useradd -o -u 1000 -g user -m user
EOF

WORKDIR /work
ADD ./package.json ./package-lock.json ./.npmrc /work/
RUN gosu user npm ci

ADD ./gatsby-config.ts ./gatsby-node.ts /work/
ADD ./static ./src /work/

CMD [ "npm", "run", "build" ]
