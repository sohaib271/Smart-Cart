import { useLoading } from "./loading/loading"
import Spinner from "./Spinner";
function SpinnerContainer(){
  const {isLoading}=useLoading();
  return <>
     {isLoading && (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
      <Spinner />
    </div>
  )}
  </>
}
export default SpinnerContainer;