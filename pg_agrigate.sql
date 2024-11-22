
    BEGIN
        IF NOT EXISTS
            (SELECT 1
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_name = 'subjects'
            )
        THEN
            CREATE TABLE subjects
            (
                id   SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            );
        END IF;
    END

