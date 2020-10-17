import dynamic from 'next/dynamic'
const DynamicComponent = dynamic(
  () => import('./components/Doughnut'), 
  {
    ssr: false
  }
)
export default DynamicComponent;
