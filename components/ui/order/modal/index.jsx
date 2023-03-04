import { useEthPrice, COURSE_PRICE } from "@components/providers/web3/hooks/useEthPrice"
// import { useEthPrice } from "@components/hooks/web3" 
import { Modal, Button } from "@components/ui/common";
import { useState, useEffect } from 'react'


// Creates the object that contains the necessary fields for our order form.
const defaultOrder = {
  price: "",
  email: "",
  confirmationEmail: "",
  enablePrice: true,
  termsOfService: false,
}

// Creates a default state for our form, which adds the keys isDisabled and message. These are keys we will need to acces in order to relay necessary information to users.
const _createFormState = (
  isDisabled= false, 
  message= "",
  ) => ({isDisabled, message})

// Creates a function with a variety of scenarios in which we would need to relay necessary information about the state of the form and prohibt submition if necessary.  
const createFormState = ({price, email, confirmationEmail, isNewPurchase }) => {
  if (!price || Number(price) <= 0) {
    return _createFormState(true, "Price is Invalid")

  if (isNewPurchase) {
  } else if (confirmationEmail.length === 0 || email.length === 0) {
    return _createFormState(true)
  } else if (email !== confirmationEmail) {
    return _createFormState(true, "Please Make Sure Confirmation Email and Email are the Same.")
  }
}
  return _createFormState()
}

export default function OrderModal({course, onClose, onSumbit, isNewPurchase}) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState(defaultOrder)
  const { eth, perItem } = useEthPrice()

  const {price, email, confirmationEmail, enablePrice, termsOfService} = order

  // When the modal is opened, the price field is populated with the perItem price from our useEth hook.
  useEffect(() => {
    if(!!course) {
      setIsOpen(true)
      setOrder({
        ...defaultOrder,
        price: perItem
      })
    }
  }, [course])
  
  // Closes the modal. OnClose function resets course to null.
  const closeModal = () => {
    setIsOpen(false)
    setOrder(defaultOrder)
    onClose()
  }
  
  const formstate = createFormState(order)
  
  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="mb-7 text-lg font-bold leading-6 text-gray-900" id="modal-title">
                {/* This is a hack because as soon as you close the modal, an error in the app gets thrown because course gets set to undefined */}
              {
                course ?
                course.title : 
                "Undefined"
              }
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        checked={enablePrice}
                        onChange={({target: {checked}}) => {
                          setOrder({
                            ...order,
                            price: checked ? price : perItem,
                            enablePrice: !enablePrice
                          })
                        }}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>Adjust Price - only when the price is not correct</span>
                  </div>
                </div>
                <input
                  // Currently this is wrong. Should not be an input box. It should just display the price. This needs work.
                  value={price}
                  onChange={({target:{value}}) => {
                    if (isNaN(value)) {
                        return;
                      }
                    setOrder({
                      ...order,
                      price: value
                    })
                  }}
                  name="price"
                  id="price"
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price will be lower, order can be declined (+- 2% slipage is allowed)
                </p>
              </div>
              <div className="mt-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Email</label>
                </div>
                <input
                  onChange={({target: {value}}) => {
                    setOrder({
                      ...order,
                      email: value.trim()
                    })
                  }}
                  type="email"
                  name="email"
                  id="email"
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
                <p className="text-xs text-gray-700 mt-1">
                It&apos;s important to fill a correct email, otherwise the order cannot be verified. We are not storing your email anywhere
                </p>
              </div>
              <div className="my-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Confirm Email</label>
                </div>
                <input
                  onChange={({target: {value}}) => {
                    setOrder({
                      ...order,
                      confirmationEmail: value.trim()
                    })
                  }}
                  type="email"
                  name="confirmationEmail"
                  id="confirmationEmail"
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md" placeholder="x@y.com" />
              </div>
              <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                   checked={termsOfService}
                   onChange={({target: {checked}}) => {
                     setOrder({
                       ...order,
                       termsOfService: !termsOfService
                     })
                   }}
                    type="checkbox"
                    className="form-checkbox" />
                </label>
                <span>I accept Eincode &apos;terms of service&apos; and I accept that my order may be rejected in the event that the information provided is incorrect</span>
              </div>
              { formstate.message && 
                <div className="p-4 my-3 text-red-700 bg-red-200 rounded-lg text-sm">
                  {formstate.message}
                </div>
              }
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <Button
            disabled={formstate.isDisabled}
            onClick={() => {
              onSumbit(order, course)
              setOrder({defaultOrder})
              closeModal()
            }}
          >
            Submit
          </Button>
          <Button
            variant="red"
            onClick={() => {
              setOrder({defaultOrder})
              closeModal()
            }}  
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
 