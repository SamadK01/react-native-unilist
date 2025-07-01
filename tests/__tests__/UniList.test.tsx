import React from 'react';
import { render } from '@testing-library/react-native';
import { UniList } from '../UniList';

describe('UniList', () => {
  it('renders FlatList when data prop present', () => {
    const { getByTestId } = render(
      <UniList
        data={[1, 2]}
        renderItem={(item) => <></>}
        testID="uni-list"
      />
    );
    expect(getByTestId('uni-list')).toBeTruthy();
  });

  it('renders ScrollView when no data', () => {
    const { getByTestId } = render(
      <UniList testID="uni-list-scroll">
        <></>
      </UniList>
    );
    expect(getByTestId('uni-list-scroll')).toBeTruthy();
  });
});
