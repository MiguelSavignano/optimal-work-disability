#!/bin/bash
set -e

APP_NAME=incapacidad-temporal-optima

# Create the app if it doesn't exist yet (first-time only)
# fly apps create $APP_NAME

fly deploy --app $APP_NAME
