import Form from '@/components/form/form'
import Label from '@/components/label/label'
import Input from '@/components/input/input'
import Button from '@/components/button/button'
export default function Login() {
  return (
    <>
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login{' '}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form formName="Login Form" className="space-y-6" onSubmit={() => {}}>
            <>
              <div>
                <Label
                  name="username"
                  title="User Name"
                  className="block text-sm/6 font-medium text-gray-900"
                />
                <div className="mt-2">
                  <Input
                    name="username"
                    className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="User Name"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div>
                <Label
                  name="password"
                  title="Password"
                  className="block text-sm/6 font-medium text-gray-900"
                />
                <div className="mt-2">
                  <Input
                    name="password"
                    className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Password"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div>
                <Button
                  name="Login Now"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={false}
                />
              </div>
            </>
          </Form>
        </div>
      </div>
    </>
  )
}
