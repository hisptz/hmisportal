import {vmcc} from './indicators/vmcc';
import {tracer_medicine} from './indicators/tracer_medicine';
import {tb} from './indicators/tb';
import {sti} from './indicators/sti';
import {postnatalCare} from './indicators/postnatalCare';
import {pmtct} from './indicators/pmtct';
import {nutrition} from './indicators/nutrition';
import {noncommunicabledisease} from './indicators/noncommunicabledisease';
import {mortalities} from './indicators/mortalities';
import {newbornCare} from './indicators/newbornCare';
import {malaria} from './indicators/malaria';
import {laborDelivery} from './indicators/laborDelivery';
import {ivd} from './indicators/ivd';
import {gbvVac} from './indicators/gbvVac';
import {hivaids} from './indicators/hivaids';
import {cervicalCancer} from './indicators/cervicalCancer';
import {art} from './indicators/art';
import {antenatalCare} from './indicators/antenatalCare';
import {ancIntegration} from './indicators/ancIntegration';
import {pediatrichiv} from './indicators/pediatrichiv';
import {dashboards} from './indicators/dashboards';

export interface StoreData {
  indicators: any[];
  currentperiod: any;
  currentperiodtype: any;
  options: any;
  currentorgunit: any;
  orgUnits: any[];
  data: any;
  quarters: any[];
  years: any[];
  icons: any[];
}

export const INITIAL_STORE_DATA: StoreData = {
  indicators: [],
  currentperiod: '2017Q2',
  currentperiodtype: 'Quarter',
  options: null,
  currentorgunit: {name: 'MOH Tanzania', id: 'm0frOspS7JY'},
  orgUnits: [
    {
      'name': 'MOH Tanzania',
      'id': 'm0frOspS7JY'
    },
    {
      'name': 'Arusha Region',
      'id': 'YtVMnut7Foe'
    },
    {
      'name': 'Dar Es Salaam Region',
      'id': 'acZHYslyJLt'
    },
    {
      'name': 'Dodoma Region',
      'id': 'Cpd5l15XxwA'
    },
    {
      'name': 'Geita Region',
      'id': 'MAL4cfZoFhJ'
    },
    {
      'name': 'Iringa Region',
      'id': 'sWOWPBvwNY2'
    },
    {
      'name': 'Kagera Region',
      'id': 'Crkg9BoUo5w'
    },
    {
      'name': 'Katavi Region',
      'id': 'DWSo42hunXH'
    },
    {
      'name': 'Kigoma Region',
      'id': 'RD96nI1JXVV'
    },
    {
      'name': 'Kilimanjaro Region',
      'id': 'lnOyHhoLzre'
    },
    {
      'name': 'Lindi Region',
      'id': 'VMgrQWSVIYn'
    },
    {
      'name': 'Manyara Region',
      'id': 'qg5ySBw9X5l'
    },
    {
      'name': 'Mara Region',
      'id': 'vYT08q7Wo33'
    },
    {
      'name': 'Mbeya Region',
      'id': 'A3b5mw8DJYC'
    },
    {
      'name': 'Morogoro Region',
      'id': 'Sj50oz9EHvD'
    },
    {
      'name': 'Mtwara Region',
      'id': 'bN5q5k5DgLA'
    },
    {
      'name': 'Mwanza Region',
      'id': 'hAFRrgDK0fy'
    },
    {
      'name': 'Njombe Region',
      'id': 'qarQhOt2OEh'
    },
    {
      'name': 'Pwani Region',
      'id': 'yyW17iCz9As'
    },
    {
      'name': 'Rukwa Region',
      'id': 'vAtZ8a924Lx'
    },
    {
      'name': 'Ruvuma Region',
      'id': 'ZYYX8Q9SGoV'
    },
    {
      'name': 'Shinyanga Region',
      'id': 'EO3Ps3ny0Nr'
    },
    {
      'name': 'Simiyu Region',
      'id': 'IgTAEKMqKRe'
    },
    {
      'name': 'Singida Region',
      'id': 'LGTVRhKSn1V'
    },
    {
      'name': 'Songwe Region',
      'id': 'Rg0jCRi9297'
    },
    {
      'name': 'Tabora Region',
      'id': 'kZ6RlMnt2bp'
    },
    {
      'name': 'Tanga Region',
      'id': 'vU0Qt1A5IDz'
    }
  ],
  data: {
    'dashboards': dashboards,
    'ancIntegration': ancIntegration,
    'antenatalCare': antenatalCare,
    'art': art,
    'cervicalCancer': cervicalCancer,
    'gbvVac': gbvVac,
    'hivaids': hivaids,
    'ivd': ivd,
    'laborDelivery': laborDelivery,
    'malaria': malaria,
    'mortalities': mortalities,
    'newbornCare': newbornCare,
    'noncommunicabledisease': noncommunicabledisease,
    'nutrition': nutrition,
    'pediatrichiv': pediatrichiv,
    'pmtct': pmtct,
    'postnatalCare': postnatalCare,
    'sti': sti,
    'tb': tb,
    'tracer_medicine': tracer_medicine,
    'vmcc': vmcc
  },
  quarters: [
    {'id': '2017Q2', 'name': 'Apr - Jun 2017'},
    {'id': '2017Q1', 'name': 'Jan - Mar 2017'},
    {'id': '2016Q4', 'name': 'Oct - Dec 2016'},
    {'id': '2016Q3', 'name': 'Jul - Sep 2016'},
    {'id': '2016Q2', 'name': 'Apr - Jun 2016'},
    {'id': '2016Q1', 'name': 'Jan - Mar 2016'},
    {'id': '2015Q4', 'name': 'Oct - Dec 2015'},
    {'id': '2015Q3', 'name': 'Jul - Sep 2015'},
    {'id': '2015Q2', 'name': 'Apr - Jun 2015'},
    {'id': '2015Q1', 'name': 'Jan - Mar 2015'},
    {'id': '2014Q4', 'name': 'Oct - Dec 2014'},
    {'id': '2014Q3', 'name': 'Jul - Sep 2014'},
    {'id': '2014Q2', 'name': 'Apr - Jun 2014'},
    {'id': '2014Q1', 'name': 'Jan - Mar 2014'},
  ],
  years: [
    {'name': '2017', 'id': '2017'},
    {'name': '2016', 'id': '2016'},
    {'name': '2015', 'id': '2015'},
    {'name': '2014', 'id': '2014'},
  ],
  icons: [
    {name: 'table', image: 'table.jpg', action: ''},
    {name: 'column', image: 'bar.png', action: ''},
    {name: 'line', image: 'line.png', action: ''},
    {name: 'combined', image: 'combined.jpg', action: ''},
    {name: 'bar', image: 'column.png', action: ''},
    {name: 'area', image: 'area.jpg', action: ''},
    {name: 'pie', image: 'pie.png', action: ''},
    {name: 'map', image: 'map.jpg', action: ''}
  ]
};
