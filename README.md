# Snapboard - Grid

Snapboard Grid is an Excel like datasheet built on React Virtualized. It is designed for internal use at Snapboard, but you're free to use it.


```js
<Sheet
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

This repo is part of the [Snapboard](https://snapboard.io).
