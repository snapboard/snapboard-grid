# Snapboard - Grid

Snapboard Grid is an Excel like datasheet built on React Virtualized. It is designed for internal use at Snapboard, but you're free to use it.

#### Install

```
yarn add @snapboard/grid
```


#### Usage

```js
import Grid from '@snapboard/grid'

<Grid
  columns={columns}
  rowCount={rows.length}
  rowGetter={i => rows[i]}
  gutterOffset={0}
  columnMenu={columnMenu}
  rowMenu={rowMenu}
  onAddColumn={action('onAddColumn')}
  onAddRow={action('onAddRow')}
/>

```

#### Links

This repo is used for [Snapboard](https://snapboard.io).
