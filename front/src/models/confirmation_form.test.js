import * as Model from './confirmation_form';

const dateFormat = d => d.format("YYYY-MM-DD")

it('.calculateDatesList', () => {
  let response = Model.calculateDatesList("2018-08-01", 150)
  expect(response).toBeInstanceOf(Array)
});

it('.short date list is in the medical leave period', () => {
  let response = Model.short("2018-08-01", 10)
  expect(response.map(dateFormat)).not.toMatchObject(['2018-08-07', '2018-08-21'])
  expect(response.map(dateFormat)).toMatchObject(['2018-08-07'])
});

// functional
const date_start = "2018-08-01"

it('.calculateDatesList 20 (short)', () => {
  let response = Model.calculateDatesList(date_start, 30)
  expect(response.map(dateFormat)).toMatchObject(['2018-08-07', '2018-08-21'])
});

it('.calculateDatesList 35 (medium)', () => {
  let response = Model.calculateDatesList(date_start, 60)
  expect(response.map(dateFormat)).toMatchObject(['2018-08-07', '2018-09-04'])
});

it('.calculateDatesList 100 (large)', () => {
  let response = Model.calculateDatesList(date_start, 100)
  expect(response.map(dateFormat)).toMatchObject(['2018-08-14', '2018-09-18', '2018-10-23'])
});
