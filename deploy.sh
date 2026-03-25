#!/bin/bash
set -e

APP_NAME=incapacidad-temporal-optima

fly deploy --app $APP_NAME --no-cache
