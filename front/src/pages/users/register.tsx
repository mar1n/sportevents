import Form from '@/components/form/form'
import Label from '@/components/label/label'
import Input from '@/components/input/input'
export default function Register() {
  return (
    <>
      <div>
        Register User{' '}
        <Form formName="RegisterForm" onClick={() => {}}>
          <>
            <Label name="userName" title="UserName" />
            <Input
              name="userName"
              className="userName"
              placeholder="UserName"
              value=""
              onChange={() => {}}
            />
          </>
        </Form>
      </div>
    </>
  )
}
