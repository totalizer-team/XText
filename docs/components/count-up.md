---
group:
  title: Effects
---

# Count Up

```jsx
import React, { useState } from 'react';

import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { Box, IconButton, Stack } from '@mui/material';

import CountUp from '../../src/CountUp';

export default () => {
  const [tick, setTick] = useState(0);
  return (
    <Box sx={{ position: 'relative', p: 4 }}>
      <Stack spacing={1} alignItems="center">
        <CountUp
          key={`01_${tick}`}
          animate={{
            to: 500,
            unit: '+',
          }}
          fontSize={24}
        />

        <CountUp
          key={`02_${tick}`}
          animate={{
            from: 100,
            to: 324.23,
            toFixed: 2,
            unit: 'k',
          }}
          fontSize={24}
        />
      </Stack>
      <IconButton
        sx={{
          position: 'absolute',
          zIndex: 10,
          top: 10,
          right: 10,
        }}
        onClick={() => {
          setTick(tick + 1);
        }}
        size="small"
      >
        <ReplayRoundedIcon />
      </IconButton>
    </Box>
  );
};
```

## API

Props of the `Typography` component are also available.

| Name    | Type           | Default | Description |
| ------- | -------------- | ------- | ----------- |
| animate | `AnimateProps` | `{}`    |             |

### AnimateProps

| Name     | Type     | Default | Description |
| -------- | -------- | ------- | ----------- |
| to       | `number` | `0`     |             |
| from     | `number` | `0`     |             |
| toFixed  | `number` | `0`     |             |
| once     | `bool`   | `true`  |             |
| duration | `number` | `2`     |             |
| amount   | `number` | `0.5`   |             |
| unit     | `string` | `""`    |             |
