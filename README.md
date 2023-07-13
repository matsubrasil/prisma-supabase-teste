### Prisma and Supabase

## video base

https://www.youtube.com/watch?v=iXXgUeKt-tM&t=2107s

### Prisma

### Supabase

### Problem

> Can't migrate schema using Prisma with Supabase

```code
Error: db error: FATAL: bouncer config error
   0: migration_core::state::DevDiagnostic
             at migration-engine/core/src/state.rs:251

```

1. Solution

   https://stackoverflow.com/questions/74876237/cant-migrate-schema-using-prisma-with-supabase

```text
I fixed this error on my end by replacing the port number of my connection string from 6543 to 5432.

Reason: 6543 is the pooled port number which should not be used when migrating, instead the non-pooled connection string using 5432 should be used

Hope this helps!

Source: Second paragraph of the section "Connection pooling with Supabase" https://supabase.com/docs/guides/integrations/prisma#connection-pooling-with-supabase

```
