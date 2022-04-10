#!/usr/bin/env sh

ng build --prod --base-href "https://wdudek82.github.io/learning-testing-2022-frontend/"

angular-cli-ghpages --dir="dist/learning-testing-2022-frontend"
