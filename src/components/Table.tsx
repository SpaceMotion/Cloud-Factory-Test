import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import * as React from 'react';

interface TableColumn {
  label: string;
}

type TableColumns = {
  [columnId: string]: TableColumn;
};

type TableRow<CID extends string | number | symbol> = {
  [P in CID]: any;
};

type TableCellRenderer<
  CID extends string | number | symbol,
  R extends TableRow<CID>
> = (columnId: CID, data: R[CID]) => React.ReactElement;

interface TableProps<C extends TableColumns, R extends TableRow<keyof C>> {
  columns: C;
  data: R[];
  renderCell: TableCellRenderer<keyof R, R>;
  style?: StyleProp<ViewStyle>;
}

function renderRow<
  CID extends string | number | symbol,
  R extends TableRow<CID>
>(
  renderCell: TableCellRenderer<CID, R[CID]>,
  columns: string[],
  item: ListRenderItemInfo<R>,
) {
  return (
    <View style={styles.row}>
      {columns.map((columnId, idx) => (
        <View
          style={[
            styles.cell,
            {
              width: 100 / columns.length + '%',
            },
            idx === 0 ? styles.cellBorderLeft : null,
          ]}
          key={columnId}>
          {renderCell(columnId as CID, item.item[columnId])}
        </View>
      ))}
    </View>
  );
}

export function Table<C extends TableColumns, R extends TableRow<keyof C>>(
  props: TableProps<C, R>,
) {
  const columns = Object.keys(props.columns);

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.header}>
        {columns.map((columnId, idx) => (
          <View
            style={[
              styles.headerColumn,
              {
                width: 100 / columns.length + '%',
              },
              idx === 0 ? styles.headerColumnBorderLeft : null,
            ]}
            key={columnId}>
            <Text style={styles.headerColumnText}>
              {props.columns[columnId].label}
            </Text>
          </View>
        ))}
      </View>
      <FlatList
        data={props.data}
        renderItem={renderRow.bind(null, props.renderCell, columns)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  headerColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    borderColor: '#ccc',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  headerColumnBorderLeft: {
    borderLeftWidth: 1,
  },
  headerColumnText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    padding: 3,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  cellBorderLeft: {
    borderLeftWidth: 1,
  },
});
