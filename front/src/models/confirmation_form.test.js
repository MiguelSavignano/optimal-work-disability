import * as Model from './confirmation_form';

const dateFormat = d => d.format("YYYY-MM-DD")
it('.short example 10 only dates in date start and estimated time rage', () => {
  let response = Model.short("2018-06-01", 10)
  expect(response.map(dateFormat)).toMatchObject([
    "2018-06-08"
  ])
});

it('.large', () => {
  let response = Model.large("2018-06-01", 150)
  expect(response.map(dateFormat)).toMatchObject([
    "2018-06-08",
    "2018-07-13",
    "2018-08-17",
    "2018-09-21",
    "2018-10-26",
  ])
});

it('.calculateDatesList', () => {
  let response = Model.calculateDatesList("2018-06-01", 150)
  expect(response).toBeInstanceOf(Array)
});

it('.calculateDatesList 30', () => {
  let response = Model.calculateDatesList("2018-06-01", 30)
  expect(response.map(dateFormat)).toMatchObject([
    '2018-06-08',
    '2018-06-22'
  ])
});
