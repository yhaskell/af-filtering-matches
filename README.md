# filtering-matches

Realisation of test task (see [https://github.com/affinitas/coding_exercises_options/tree/master/filtering_matches](https://github.com/affinitas/coding_exercises_options/tree/master/filtering_matches) for more details.)

## starting

Docker container can be built to test it:

```sh
docker build -t yhaskell/filtering-matches .
docker run --add-host=database:<database host> -p 8274:8274 yhaskell/filtering-matches
```

Project requires connection to MongoDB server. It is expected that mongodb server will be exposed 
at `<database host>` which will allow connections to `/matches` db it without authentication.

To populate DB with sample data, run following command:

```sh
cd backend
npm run populatedb
# if db isn't actually at the machine population will be done, use following:
npx cross-env MONGOURL=<MongoDB URL connection> npm run populatedb
```



Alternatively, working copy is available via internet [here](http://matches.nanodesu.org/).

