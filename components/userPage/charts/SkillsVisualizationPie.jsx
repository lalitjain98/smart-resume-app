import dynamic from 'next/dynamic'
const DynamicComponent = dynamic(
  () => import('./components/Pie'), 
  {
    ssr: false
  }
)
export default DynamicComponent;
