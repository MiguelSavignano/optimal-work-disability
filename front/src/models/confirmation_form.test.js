import * as Model from './confirmation_form';

const dateFormat = d => d.format("YYYY-MM-DD")

it('.short example 10 only dates in date start and estimated time rage', () => {
  let response = Model.short("2018-06-01", 10)
  expect(response.map(dateFormat)).toMatchObject(["2018-06-07"])
});

it('.large', () => {
  let response = Model.large("2018-08-01", 150)
  expect(response.map(dateFormat)).toMatchObject(
    ["2018-08-07", "2018-09-11", "2018-10-16", "2018-11-20", "2018-12-25"]
  )
});

it('.calculateDatesList', () => {
  let response = Model.calculateDatesList("2018-08-01", 150)
  expect(response).toBeInstanceOf(Array)
});

it('.calculateDatesList 35 (medium)', () => {
  let response = Model.calculateDatesList("2018-08-01", 35)
  expect(response.map(dateFormat)).toMatchObject(['2018-08-07', '2018-09-04'])
});
