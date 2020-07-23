#!/usr/bin/env bash
#docker build -t knowledge-dev:v1.0.0 --target test . --no-cache
if [ $# -gt 0 ]; then
  if [ "$1" == 'build' ]; then
    echo -e "Generate image for test....."

    if [ "$2" == '-t' ]; then
      shift 2;
      echo -e "Building image....."
      docker build -t  $@ --target test . --no-cache
      echo -e "Build finished!"
    fi
  fi
fi
