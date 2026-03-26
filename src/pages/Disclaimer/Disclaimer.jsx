export default function Disclaimer() {
  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{
        backgroundColor: "var(--bg-default)",
        color: "var(--text-secondary)",
      }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Disclaimer
        </h1>

        <p
          className="text-sm mb-8"
          style={{ color: "var(--text-secondary)" }}
        >
          Last updated: February 10, 2026
        </p>

        {/* Section */}
        <section className="space-y-6">

          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Interpretation and Definitions
            </h2>

            <h3
              className="text-lg font-medium mt-4 mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Interpretation
            </h3>

            <p style={{ color: "var(--text-secondary)" }}>
              The words whose initial letters are capitalized have meanings defined
              under the following conditions. The following definitions shall have
              the same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h3
              className="text-lg font-medium mt-4 mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Definitions
            </h3>

            <p className="mb-2" style={{ color: "var(--text-secondary)" }}>
              For the purposes of this Disclaimer:
            </p>

            <ul
              className="list-disc pl-6 space-y-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Company
                </strong>{" "}
                refers to L.AI.RRY.
              </li>

              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Service
                </strong>{" "}
                refers to the Website.
              </li>

              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  You
                </strong>{" "}
                means the individual accessing the Service, or other legal entity on behalf of which such
                individual is accessing or using the Service.
              </li>

              <li>
                <strong style={{ color: "var(--text-primary)" }}>
                  Website
                </strong>{" "}
                refers to L.AI.RRY, accessible from{" "}
                <a
                  href="https://lairry.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--primary)",
                    fontWeight: 500,
                  }}
                >
                  lairry.app
                </a>
                .
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Disclaimer
            </h2>

            <p style={{ color: "var(--text-secondary)" }}>
              The information contained on the Service is for general information purposes only.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              The Company assumes no responsibility for errors or omissions in the
              contents of the Service.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              In no event shall the Company be liable for any damages arising out of
              the use of the Service. The Company reserves the right to modify the
              contents at any time without prior notice.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              This Disclaimer has been created with the help of the{" "}
              <a
                href="https://www.termsfeed.com/disclaimer-generator/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--primary)",
                  fontWeight: 500,
                }}
              >
                Disclaimer Generator
              </a>
              .
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              The Company does not warrant that the Service is free of harmful components.
            </p>
          </div>

          {/* External Links */}
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              External Links Disclaimer
            </h2>

            <p style={{ color: "var(--text-secondary)" }}>
              The Service may contain links to external websites that are not
              provided or maintained by the Company.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              The Company does not guarantee the accuracy or completeness of any
              information on external websites.
            </p>
          </div>

          {/* Errors */}
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Errors and Omissions Disclaimer
            </h2>

            <p style={{ color: "var(--text-secondary)" }}>
              While every effort is made to ensure accuracy, errors can occur due
              to changing laws and regulations.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              The Company is not responsible for any errors or omissions, or for the
              results obtained from the use of this information.
            </p>
          </div>

          {/* Fair Use */}
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Fair Use Disclaimer
            </h2>

            <p style={{ color: "var(--text-secondary)" }}>
              The Company may use copyrighted material under fair use for criticism,
              comment, teaching, or research.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              If You wish to use such material beyond fair use, You must obtain
              permission from the copyright owner.
            </p>
          </div>

          {/* Views */}
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Views Expressed Disclaimer
            </h2>

            <p style={{ color: "var(--text-secondary)" }}>
              Views and opinions expressed are those of the authors and do not
              necessarily reflect official policy.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              User-generated content is the sole responsibility of the user who
              posted it.
            </p>
          </div>

          {/* No Responsibility */}
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              No Responsibility Disclaimer
            </h2>

            <p style={{ color: "var(--text-secondary)" }}>
              The Service does not provide professional advice and should not be
              used as a substitute for consultation with professionals.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              The Company is not liable for any damages arising from the use of the
              Service.
            </p>
          </div>

          {/* Use at your own risk */}
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              "Use at Your Own Risk" Disclaimer
            </h2>

            <p style={{ color: "var(--text-secondary)" }}>
              All information is provided "as is" without warranty of any kind.
            </p>

            <p style={{ color: "var(--text-secondary)" }}>
              The Company will not be liable for any decisions made based on this
              information.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Contact Us
            </h2>

            <p style={{ color: "var(--text-secondary)" }}>
              If you have any questions about this Disclaimer:
            </p>

            <p className="mt-2">
              📧{" "}
              <a
                href="mailto:nn8ninsyssky@gmail.com"
                style={{
                  color: "var(--primary)",
                  fontWeight: 500,
                }}
              >
                nn8ninsyssky@gmail.com
              </a>
            </p>
          </div>

        </section>
      </div>
    </div>
  );
}
