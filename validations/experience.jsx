import * as Yup from 'yup';
import moment from 'moment';

const Experience = Yup.object({
  title: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(100, 'Must be 100 characters or less')
    .required('Required'),
  subtitle: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(100, 'Must be 100 characters or less'),
  description: Yup.string()
    // .min(50, 'Must be 50 characters or more')
    .max(1000, 'Must be 1000 characters or less'),
  startDate: Yup.string()
    .required('Required'),
  isPresent: Yup.boolean(),
  endDate: Yup.string()
    // .required('Required')
    .test(
      'endGreaterThanEqualToStart',
      'End Date should not be less than Start Date',
      function endDateNotLessThanStartDate(value) {
        if (this.parent.isPresent) return true;

        const sd = moment(this.parent.startDate);
        // console.log(sd, value, sd.diff(moment(value)));
        return sd.diff(moment(value)) < 0;
      },
    ),
  linkText: Yup.string()
    .max(100, 'Must be 100 characters or less'),
  // .required('Required'),
  linkUrl: Yup.string()
    .max(100, 'Must be 100 characters or less')
    .url('Must be valid URL')
    .test(
      'startWithHttps',
      'Must start with https:// or http://',
      (value) => !value || (value && (value.startsWith('http://') || value.startsWith('https://'))),
    ),
  // .required('Required'),

  // email: Yup.string()
  //   .email('Invalid email addresss`')
  //   .required('Required'),
  // mobileNo: Yup.string()
  //   .matches(/[0-9]+/, { message: 'Phone number is not valid', excludeEmptyString: false })
  //   .test('len', 'Must be 10 Digit Phone Number', val => val.length === 10)
  //   .required('Required'),
  // organization: Yup.string()
  //   .max(250,  `Must be 250 characters or less`),


});

export default Experience;
