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
  T extends TableRow<string | number | symbol>,
  CID extends keyof T
> = (columnId: CID, data: T[CID]) => React.ReactElement;

interface TableProps<C extends TableColumns, R extends TableRow<keyof C>> {
  columns: C;
  data: R[];
  renderCell: TableCellRenderer<R, keyof R>;
  style?: StyleProp<ViewStyle>;
}

function renderRow<CID extends string, TR extends TableRow<CID>>(
  renderCell: TableCellRenderer<TR[CID], keyof TR[CID]>,
  columns: string[],
  item: ListRenderItemInfo<TR>,
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
          {renderCell(columnId, item.item[columnId])}
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
    justifyContent: 'space-between',
  },
  headerColumn: {
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
