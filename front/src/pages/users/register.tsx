import Input from '@/components/input/input'
import Form from '@/components/form/form'
export default function Register() {
  return (
    <>
      <div>
        Register User{' '}
        <Form formName='RegisterForm' onClick={() => {}}>
        <Input
          name="userName"
          className="userName"
          placeholder="UserName"
          value=""
          onChange={() => {}}
        />
        </Form>
      </div>
    </>
  )
}
