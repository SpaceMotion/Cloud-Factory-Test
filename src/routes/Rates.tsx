import {Table} from '../components/Table';
import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import {RatesManager} from '../state/rates';
import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

interface RatesProps {}

const columns = {
  name: {
    label: 'name',
  },
  last: {
    label: 'last',
  },
  highestBid: {
    label: 'highestBid',
  },
  percentChange: {
    label: 'percentChange',
  },
};

function renderCell(columnId: keyof typeof columns, data: string) {
  return <Text>{data}</Text>;
}

function keyExtractor(
  row: {
    [key in keyof typeof columns]: string;
  },
) {
  return row.name;
}

export const Rates = observer(function (props: RatesProps) {
  useFocusEffect(
    useCallback(() => {
      RatesManager.startFetching();
      return () => RatesManager.stopFetching();
    }, []),
  );

  return (
    <>
      {RatesManager.isError() && (
        <Text style={styles.error}>{'Something went wrong'}</Text>
      )}
      <Table
        columns={columns}
        data={RatesManager.getData()}
        renderCell={renderCell}
        rowKeyExtractor={keyExtractor}
      />
    </>
  );
});

const styles = StyleSheet.create({
  error: {
    padding: 10,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
