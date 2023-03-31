#!/bin/sh

echo "waiting for mysql is up ..."

while ! mysqladmin ping -h"$MYSQL_HOST" --silent; do
  echo "waiting for mysql is up ...";
  sleep 1;
done

echo "mysql is up - executing command"

# Run api application
npm run dev