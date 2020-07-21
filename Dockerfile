FROM node:14.5-slim as base
LABEL org.opencontainers.image.author="andre.telestp@gmail.com"
LABEL org.opencontainers.image.title="Image backend knowledge"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.andretelestp.nodeversion=$NODE_VERSION
ENV NODE_ENV=production
EXPOSE 3333
ENV PORT 3333
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn config list
RUN yarn install --frozen-lockfile && yarn cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
CMD ["yarn", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN apt-get update -qq && apt-get install -qy \
  ca-certificates \
  bzip2 \
  curl \
  libfontconfig \
  --no-install-recommends
RUN yarn config list
RUN yarn install \
  && yarn cache clean --force
USER node
CMD ["yarn","dev"]

FROM dev as testing
ENV NODE_ENV=test
COPY . .
RUN yarn test
ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
USER root
RUN chmod +x /microscanner
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

FROM test as pre-prod
RUN rm -rf ./__tests__ && rm -rf ./node_modules

FROM base as production
COPY --from=pre-prod /app /app
USER node
