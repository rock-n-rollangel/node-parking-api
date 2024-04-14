import { TimeHelper } from './time.helper';

describe('TariffsController', () => {
  it('should throw error', () => {
    expect(() => {
      new TimeHelper('25:00');
    }).toThrow();
  });

  it('should return number', () => {
    expect(TimeHelper.getSecondsFromTime('00:00')).toEqual(0);
  });

  it('should return 01:00', () => {
    expect(new TimeHelper(3600).getHumanReadable()).toBe('01:00');
  });

  it('should fail big number', () => {
    expect(() => {
      new TimeHelper(25 * 3600);
    }).toThrow();
  });

  it('should be 23:59 number is lower them limit', () => {
    expect(new TimeHelper(24 * 3600 - 1).getHumanReadable()).toEqual('23:59');
  });
});
